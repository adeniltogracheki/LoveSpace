import { getSupabaseClient } from '@/template';
import { Couple, Avatar, PartnerInfo } from '@/types/couple';

const supabase = getSupabaseClient();

export const coupleService = {
  // Generate and create a new couple invitation
  async createInvitation(): Promise<{ data: Couple | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: 'Usuário não autenticado' };

      // Check if user already has an active couple
      const { data: existing } = await supabase
        .from('couples')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .in('status', ['pending', 'active'])
        .single();

      if (existing) {
        return { data: existing as Couple, error: null };
      }

      // Generate invite code
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_invite_code');

      if (codeError) throw codeError;

      // Create new couple record
      const { data, error } = await supabase
        .from('couples')
        .insert({
          user1_id: user.id,
          user2_id: user.id, // Temporary, will be updated when partner joins
          invite_code: codeData,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return { data: data as Couple, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  // Join a couple using invite code
  async joinCouple(inviteCode: string): Promise<{ data: Couple | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: 'Usuário não autenticado' };

      // Find the couple invitation
      const { data: couple, error: fetchError } = await supabase
        .from('couples')
        .select('*')
        .eq('invite_code', inviteCode.toUpperCase())
        .eq('status', 'pending')
        .single();

      if (fetchError || !couple) {
        return { data: null, error: 'Código de convite inválido ou expirado' };
      }

      if (couple.user1_id === user.id) {
        return { data: null, error: 'Você não pode usar seu próprio código de convite' };
      }

      // Update couple with partner info
      const { data: updated, error: updateError } = await supabase
        .from('couples')
        .update({
          user2_id: user.id,
          status: 'active',
          relationship_start: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        })
        .eq('id', couple.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Create shared pet and space
      await this.createSharedResources(couple.id);

      return { data: updated as Couple, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  // Create shared resources (pet and space) for new couple
  async createSharedResources(coupleId: string): Promise<void> {
    // Create default pet
    await supabase.from('pets').insert({
      couple_id: coupleId,
      name: 'Amigo',
      type: 'dog',
      level: 1,
      happiness: 100,
      hunger: 50
    });

    // Create default space
    await supabase.from('spaces').insert({
      couple_id: coupleId,
      theme: 'cozy',
      furniture: [],
      decorations: []
    });
  },

  // Get current couple relationship
  async getCurrentCouple(): Promise<{ data: Couple | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: 'Usuário não autenticado' };

      const { data, error } = await supabase
        .from('couples')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .in('status', ['pending', 'active'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return { data: data as Couple | null, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  // Get partner information
  async getPartnerInfo(couple: Couple): Promise<{ data: PartnerInfo | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: 'Usuário não autenticado' };

      const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', partnerId)
        .single();

      if (profileError) throw profileError;

      const { data: avatar } = await supabase
        .from('avatars')
        .select('*')
        .eq('user_id', partnerId)
        .single();

      return {
        data: {
          id: profile.id,
          username: profile.username || 'Parceiro',
          email: profile.email,
          avatar: avatar as Avatar | undefined
        },
        error: null
      };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  // Get user's own avatar
  async getMyAvatar(): Promise<{ data: Avatar | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: 'Usuário não autenticado' };

      const { data, error } = await supabase
        .from('avatars')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return { data: data as Avatar, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  // Update user's avatar
  async updateAvatar(avatarData: any): Promise<{ error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { error: 'Usuário não autenticado' };

      const { error } = await supabase
        .from('avatars')
        .update({
          avatar_data: avatarData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (err) {
      return { error: (err as Error).message };
    }
  }
};