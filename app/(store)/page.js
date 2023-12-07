import Link from "next/link";
import classes from "./Home.module.css";
import OurBrand from "@/components/ourBrand/OurBrand";

export default function Home() {
    return (
        <>
            <section className={classes.section}>
                <Link href="/category/women">
                    <button>قسم النساء</button>
                </Link>
                <Link href="/category/kids">
                    <button>قسم الاطفال</button>
                </Link>
                <Link href="/category/men">
                    <button>قسم الرجال</button>
                </Link>
            </section>
            <OurBrand />
        </>
    );
}
