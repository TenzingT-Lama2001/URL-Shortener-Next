'use client'
import React, { useEffect, useState } from "react";
import { redirectToPage } from "../api/shortener";

export default function Page({ params }: { params: { shortCode: string } }) {
  const [redirectedData, setRedirectedData] = useState<string | null>(null);

  useEffect(() => {
    const redirectUser = async () => {
      try {
        // Call redirectToPage function to trigger the redirect
        const response = await redirectToPage(params.shortCode);
        console.log('Response:', response.data)
        // Assuming you want to display the response data
        setRedirectedData(response.data);
      } catch (error:any) {
        console.error('Error redirecting:', error);
        setRedirectedData(error.data);
      }
    };

    redirectUser();
  }, [params.shortCode]);

  return <div>{redirectedData && redirectedData}</div>;
}
