import Footer from "../Footer";
import NavMenu from "../NavMenu";
import SideBar from "../SideBar";

export const styleMargin = {
  marginLeft: 0,
};

export function Layout({ title, component, match }) {
  const Element = component;
  return (
    <div className="wrapper">
      <NavMenu />
      {/* <SideBar />     */}

      <div className="content-wrapper" style={styleMargin}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>{title}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">{title}</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <Element match={match} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
