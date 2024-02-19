import React, { useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";

type LinkParams = {
  linkToken: string
}

const Link = ({linkToken}:LinkParams)=>{
// const Link : React.FC<{ linkToken: string }> = ({ linkToken }) => {
//   const { linkToken, isPaymentInitiation, dispatch } = useContext(Context);

  const onSuccess = React.useCallback(
    (public_token: string) => {
      console.log("hello I am successfull", public_token)
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch("http://localhost:8000/api/set_access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
        });
        if (!response.ok) {
          console.log("no access_token retrieved")
          return;
        }
        const data = await response.json();
        console.log("line no 30", data)
      };

      exchangePublicTokenForAccessToken();
    },
    []
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <>
    <Button type="button" large onClick={() => open()}>
      Connect to your Bank
    </Button>
    </>
  
  );
};

Link.displayName = "Link";

export default Link;
