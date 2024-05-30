import React from 'react';
import { CToaster, CToast, CToastBody, CToastHeader } from "@coreui/react";

interface ErrorToastProps {
    msgerror: Error | null | any;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ msgerror }) => {
    return (
        <>
            {msgerror && (
                <CToaster className="position-static">
                    <CToast autohide={false} visible={true}>
                        <CToastHeader closeButton>
                            <svg
                                className="rounded me-2"
                                width="20"
                                height="20"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                                role="img"
                            >
                                <rect width="100%" height="100%" fill="#ff0000"></rect>
                            </svg>
                            <div className="fw-bold me-auto">Error</div>
                        </CToastHeader>
                        <CToastBody>{msgerror}</CToastBody>
                    </CToast>
                </CToaster>
            )}
        </>
    );
};

export default ErrorToast;
