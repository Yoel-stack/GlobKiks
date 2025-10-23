export default function CancelPage() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold text mb-4">Pago cancelado!</h1>
      <p className="text-lg text-center textslow">
        El proceso de pago fue cancelado. Si fue un error, puedes volver a intentarlo desde tu orden.
      </p>
      <p className="mt-4 text-center text-gray-500">
        No se ha hecho ningún cargo.
      </p>
    </div>
  );
};
