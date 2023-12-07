import TopNav from "@/components/top_nav/TopNav";
import "../globals.css";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/main_nav/Nav";

export const metadata = {
    title: "hpp shop"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body >
                <TopNav />
                <Nav/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
