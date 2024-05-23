import { CCloseButton, CContainer, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavItem, CNavLink, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-typesafe';
import { LogoutBtn } from '@components';
import { W_LOGOUT_URL, adminAccess } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";

function WorkforceNavbar() {
  const { email } = useLoaderData<typeof adminAccess>();
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar className="bg-pink h-[8%] shadow-md">
    <CContainer fluid>
      <CNavbarBrand>
        <img
          src="/src/assets/temp-logo.png"
          alt="Logo"
          className="h-10 rounded-full"
        />
      </CNavbarBrand>
      <CNavbarToggler
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
        onClick={() => setVisible(!visible)}
        className='bg-yellow border-2 border-dark shadow-md'
      />
      <COffcanvas id="offcanvasNavbar" placement="end" portal={false} visible={visible} onHide={() => setVisible(false)} className='bg-pink shadow-md'>
        <COffcanvasHeader className='flex items-center gap-3 pt-8'>
          <COffcanvasTitle>
            <img
              src="/src/assets/temp-logo.png"
              alt="Logo"
              className="h-10 rounded-full"
            />
          </COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CNavbarNav className='h-full flex flex-col justify-between'>
            <div className='py-4 flex flex-col gap-3 border-t-4 border-dark/45'>
              <CNavItem>
                <CNavLink href="/admin">
                  Dashboard
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink href="#">
                  Our Artists
                </CNavLink>
              </CNavItem>

              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle>Orders</CDropdownToggle>
                <CDropdownMenu className='bg-ivory'>
                  <CDropdownItem href="#" className='hover:bg-yellow'>Pending</CDropdownItem>
                  <CDropdownItem href="#" className='hover:bg-yellow'>In Progress</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#" className='hover:bg-yellow'>All Orders</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            
            <div className='py-4 flex flex-col gap-3 border-t-4 border-dark/45'>
              <CNavItem className='flex gap-3 items-center p-2 cursor-default'>
                <FontAwesomeIcon icon={faUser} className='h-6 bg-yellow icon--boxed'/>
                <h1 className='font-semibold tracking-widest text-lg'>{email}</h1>
              </CNavItem>

              <CNavItem>
                <LogoutBtn apiUrl={W_LOGOUT_URL} redirectPath='/w/login' className='font-semibold tracking-widest btn__primary bg-yellow' />
              </CNavItem>
            </div>
          </CNavbarNav>

        </COffcanvasBody>
      </COffcanvas>
    </CContainer>
  </CNavbar>
  )
}

export default WorkforceNavbar
