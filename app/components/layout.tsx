import Navbar from '~/components/navbar';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full ">
            <Navbar /> {/* Añade tu Navbar aquí */}
            {children}
        </div>
    );
}