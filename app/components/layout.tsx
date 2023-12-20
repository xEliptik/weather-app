import Navbar from '~/components/navbar';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full  bg-gradient-to-r from-indigo-500">
            <Navbar /> {/* Añade tu Navbar aquí */}
            {children}
        </div>
    );
}

