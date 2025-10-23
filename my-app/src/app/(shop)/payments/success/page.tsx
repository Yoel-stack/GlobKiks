import { Suspense } from 'react';
import SuccessPageClient from './SucessPageClient';

export default function SuccessPage() {
  
  return (
    <Suspense fallback={<p>Cargando confirmación de pago...</p>}>
      <SuccessPageClient />
    </Suspense>
  );
};
