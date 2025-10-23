import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'


const isProtectedRoute = createRouteMatcher(["/cart"]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Omite los componentes internos de Next.js y todos los archivos estáticos, a menos que se encuentren en los parámetros de búsqueda
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Ejecutar siempre las rutas API
    '/(api|trpc)(.*)',
  ],
};