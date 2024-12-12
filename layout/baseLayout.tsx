import Header from "<prefix>/components/Header";
interface Iprops {
    children: React.ReactNode
}
export default function BaseLayout({ children }: Iprops) {
    return <div className="main">
        <Header />
        {children}
    </div>
}