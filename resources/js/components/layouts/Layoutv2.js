import Footer from "../Footer";
import NavMenu from "../NavMenu";
import NavHeader from "./components/NavHeader";
import SideBar from "./components/SideBar";

export function Layoutv2({ title, component, match }) {
  const Element = component;
  return (
    <div className=" font-encodeSans">
      <NavHeader />
      {/* <!-- Side Navigation Panel & main content --> */}
      <section className="sm:flex">
        {/* <!-- sidebar navigation panel section  --> */}
        <SideBar />

        {/* <!-- main content section --> */}
        <main className="bg-gray-100 max-h-screen flex-1">
          <div className="p-4 pr-6">
            {/* <!-- Insert Section for other page components. Container for page components --> */}
            <Element match={match} />
          </div>
        </main>
      </section>

      <Footer />
    </div>
  );
}


export const Layoutv3 = ({ title, children })=>{
  return (
    <div className=" font-encodeSans">
      <NavHeader />
      {/* <!-- Side Navigation Panel & main content --> */}
      <section className="sm:flex">
        {/* <!-- sidebar navigation panel section  --> */}
        <SideBar />

        {/* <!-- main content section --> */}
        <main className="bg-gray-100 max-h-screen flex-1">
          <div className="p-4 pr-6">
            {/* <!-- Insert Section for other page components. Container for page components --> */}
            {children}
          </div>
        </main>
      </section>

      <Footer />
    </div>
  );
};
