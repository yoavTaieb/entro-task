import { useEffect } from 'react';

const SlackButton = (props: { onSuccess: () => void }) => {
    const URL = `
    https://slack.com/oauth/v2/authorize?client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!}
    &scope=channels:read,chat:write,users:read
    &redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI!)}
  `.replace(/\s/g, '');

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'popupClosed') {
                props.onSuccess();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleClick = () => {
        window.open(URL, 'popup', 'width=600,height=600');
    };

    return (
        <>
            <a href={URL} onClick={handleClick} target="popup">
                <img
                    alt="Add to Slack"
                    height="40"
                    width="139"
                    src="https://platform.slack-edge.com/img/add_to_slack.png"
                    srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                />
            </a>
        </>
    );
};

export default SlackButton;