import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchUserProgress, 
  updateUserProgress,
  fetchUserSkills,
  updateSkillProgress,
  fetchUserIncomeStreams,
  updateIncomeStream
} from '@/lib/api-client';

const DEMO_USER_ID = 'demo_user';

// Progress hooks
export function useUserProgress() {
  return useQuery({
    queryKey: ['progress', DEMO_USER_ID],
    queryFn: () => fetchUserProgress(DEMO_USER_ID)
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ phase, progress, completedTasks }: { phase: number; progress: number; completedTasks?: string[] }) => 
      updateUserProgress(DEMO_USER_ID, phase, progress, completedTasks || []),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress', DEMO_USER_ID] });
    }
  });
}

// Skills hooks
export function useUserSkills() {
  return useQuery({
    queryKey: ['skills', DEMO_USER_ID],
    queryFn: () => fetchUserSkills(DEMO_USER_ID)
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ skillCategory, skillName, level }: { skillCategory: string; skillName: string; level: number }) => 
      updateSkillProgress(DEMO_USER_ID, skillCategory, skillName, level),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', DEMO_USER_ID] });
    }
  });
}

// Income streams hooks
export function useUserIncomeStreams() {
  return useQuery({
    queryKey: ['income', DEMO_USER_ID],
    queryFn: () => fetchUserIncomeStreams(DEMO_USER_ID)
  });
}

export function useUpdateIncomeStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, streamType, isActive, monthlyRevenue }: { userId: string; streamType: string; isActive: number; monthlyRevenue?: number }) => 
      updateIncomeStream(userId, streamType, isActive, monthlyRevenue || 0),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['income', variables.userId] });
    },
    onError: (error) => {
      // Optionally show a toast or log error
      console.error('Failed to update income stream:', error);
    }
  });
}