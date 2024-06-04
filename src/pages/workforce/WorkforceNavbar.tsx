import {
  CCloseButton,
  CContainer,
  CNavItem,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-typesafe";
import { LogoutBtn } from "@components";
import { W_LOGOUT_URL } from "@utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { tempLogoWhite } from "@assets";

type NavProps = {
  loaderFn: () => any;
};

function WorkforceNavbar({ loaderFn }: NavProps) {
  const { email } = useLoaderData<typeof loaderFn>();
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar className="bg-green h-[8%] w-full shadow-md">
      <CContainer fluid>
        <CNavbarBrand>
          <CNavLink href="/admin">
            <img
              src={tempLogoWhite}
              alt="Logo"
              className="h-8 rounded-full"
            />
          </CNavLink>
        </CNavbarBrand>
        <CNavbarToggler
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
          className="bg-yellow border-2 border-dark shadow-md"
        />
        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
          className="bg-green shadow-md"
        >
          <COffcanvasHeader className="flex items-center gap-3 pt-8">
            <COffcanvasTitle>
              <CNavLink href="/">
                <img
                  src={tempLogoWhite}
                  alt="Logo"
                  className="h-8 rounded-full"
                />
              </CNavLink>
            </COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav className="h-full flex flex-col justify-between">
              <div className="py-4 flex flex-col gap-3 border-t-4 border-dark/45">
                <CNavItem>
                  <CNavLink href="/admin" className="text-ivory">
                    Dashboard
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink href="/admin/artists" className="text-ivory">
                    Artists
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink href="/admin/clients" className="text-ivory">
                    Clients
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink href="/admin/orders" className="text-ivory">
                    Orders
                  </CNavLink>
                </CNavItem>
              </div>

              {/* Navbar Lower Box */}
              <div className="py-4 flex flex-col gap-3 border-t-4 border-dark/45">
                <CNavItem className="flex gap-3 items-center p-2 cursor-default">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="h-6 bg-yellow icon--boxed"
                  />
                  <h1 className="font-semibold tracking-widest text-lg text-ivory">
                    {email}
                  </h1>
                </CNavItem>

                <CNavItem>
                  <LogoutBtn
                    apiUrl={W_LOGOUT_URL}
                    redirectPath="/w/login"
                    className="font-semibold tracking-widest btn__primary bg-yellow"
                  />
                </CNavItem>
              </div>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}

export default WorkforceNavbar;
