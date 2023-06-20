import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const SlackRedirect = () => {

    const router = useRouter()
    const { code } = router.query

    useEffect(() => {
        if (!code) return
        const closePopup = () => {
            try {
                window.opener.postMessage({ type: 'popupClosed' }, '*');
                window.close();
            } catch (error) {
                console.error('Failed to communicate with the main window:', error);
            }
        };
        // Replace this with your logic to handle OAuth success or failure
        const handleOAuth = async () => {
            await fetch("/api/slack-auth?code=" + code)
            closePopup();
        };
        handleOAuth();
    }, [code]);

    
    return <Spinner />
};

export default SlackRedirect;