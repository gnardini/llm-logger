import { useQuery } from '@frontend/queries/useQuery';
import { stripeSchema } from '@backend/schemas/stripe';

export function useStripePurchaseQuery() {
  return useQuery('POST', '/api/stripe', stripeSchema);
}