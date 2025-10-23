export default function termsPage(){
    
    return (
      <div className="text">
        <main className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Bases y Condiciones</h1>
          <p>
            Al usar nuestra tienda de championes, aceptas los siguientes
            términos y condiciones:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Todos los productos están sujetos a disponibilidad.</li>
            <li>Los precios pueden cambiar sin previo aviso.</li>
            <li>La información del producto es orientativa y puede variar.</li>
            <li>
              Nos reservamos el derecho de modificar o cancelar pedidos en caso
              de error.
            </li>
            <li>
              Los envíos se realizan según las políticas de la tienda y el
              transportista.
            </li>
          </ul>
          <p className="mt-6">Gracias por confiar en nosotros! Que tenga un buen dia GlobKiks!</p>
        </main>
      </div>
    );
};