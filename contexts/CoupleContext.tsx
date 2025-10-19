import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Couple, PartnerInfo, Avatar } from '@/types/couple';
import { coupleService } from '@/services/coupleService';
import { useAuth } from '@/template';

interface CoupleContextType {
  couple: Couple | null;
  partner: PartnerInfo | null;
  myAvatar: Avatar | null;
  loading: boolean;
  operationLoading: boolean;
  createInvitation: () => Promise<{ error: string | null; inviteCode?: string }>;
  joinCouple: (inviteCode: string) => Promise<{ error: string | null }>;
  refreshCouple: () => Promise<void>;
  updateAvatar: (avatarData: any) => Promise<{ error: string | null }>;
}

export const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

export function CoupleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [couple, setCouple] = useState<Couple | null>(null);
  const [partner, setPartner] = useState<PartnerInfo | null>(null);
  const [myAvatar, setMyAvatar] = useState<Avatar | null>(null);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);

  const loadCoupleData = async () => {
    if (!user) {
      setCouple(null);
      setPartner(null);
      setMyAvatar(null);
      setLoading(false);
      return;
    }

    try {
      const { data: coupleData } = await coupleService.getCurrentCouple();
      setCouple(coupleData);

      if (coupleData && coupleData.status === 'active') {
        const { data: partnerData } = await coupleService.getPartnerInfo(coupleData);
        setPartner(partnerData);
      }

      const { data: avatarData } = await coupleService.getMyAvatar();
      setMyAvatar(avatarData);
    } catch (error) {
      console.error('Erro ao carregar dados do casal:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load when user changes
  useEffect(() => {
    setLoading(true);
    loadCoupleData();
  }, [user]);

  // Auto-refresh couple status every 10 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const { data: coupleData } = await coupleService.getCurrentCouple();
      
      // Only update if status changed
      if (coupleData?.status !== couple?.status) {
        setCouple(coupleData);
        
        if (coupleData && coupleData.status === 'active' && !partner) {
          const { data: partnerData } = await coupleService.getPartnerInfo(coupleData);
          setPartner(partnerData);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [user, couple?.status]);

  const createInvitation = async () => {
    setOperationLoading(true);
    try {
      const { data, error } = await coupleService.createInvitation();
      if (error) return { error };
      
      setCouple(data);
      return { error: null, inviteCode: data?.invite_code };
    } finally {
      setOperationLoading(false);
    }
  };

  const joinCouple = async (inviteCode: string) => {
    setOperationLoading(true);
    try {
      const { data, error } = await coupleService.joinCouple(inviteCode);
      if (error) return { error };
      
      setCouple(data);
      await loadCoupleData();
      return { error: null };
    } finally {
      setOperationLoading(false);
    }
  };

  const refreshCouple = async () => {
    await loadCoupleData();
  };

  const updateAvatar = async (avatarData: any) => {
    setOperationLoading(true);
    try {
      const { error } = await coupleService.updateAvatar(avatarData);
      if (error) return { error };
      
      await loadCoupleData();
      return { error: null };
    } finally {
      setOperationLoading(false);
    }
  };

  return (
    <CoupleContext.Provider
      value={{
        couple,
        partner,
        myAvatar,
        loading,
        operationLoading,
        createInvitation,
        joinCouple,
        refreshCouple,
        updateAvatar
      }}
    >
      {children}
    </CoupleContext.Provider>
  );
}