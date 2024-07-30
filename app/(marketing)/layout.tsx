import { Navbar } from "./_components/navbar"
import { SpeedInsights } from "@vercel/speed-insights/next"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-slate-100">
            <Navbar/>
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
            <SpeedInsights/>

        </div>
    )
}
export default MarketingLayout