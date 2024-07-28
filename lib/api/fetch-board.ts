
export async function fetchBoards(orgId: string) {
    try {
      const response = await fetch(`/api/organization/get-board/${orgId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching boards:', error);
      throw error;
    }
  }
  