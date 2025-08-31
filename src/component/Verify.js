import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
    const { token } = useParams(); // we’ll grab verification token from URL
    const [status, setStatus] = useState("loading"); // loading | success | error
    const navigate = useNavigate();

    // auto-fire verification request when page loads
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/auth/verify/${token}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                await response.json();

                if (response.ok) {
                    setStatus("success");
                    console.log("success");
                    setTimeout(() => navigate("/home"), 3000); // redirect after 3s
                } else {
                    setStatus("error");
                    console.log("error");
                }
            } catch (err) {
                console.error(err);
                setStatus("error");
            }
        };
        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                {status === "loading" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Verifying your email...</h2>
                        <p>Please wait a moment.</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-green-600">Email Verified! 🎉</h2>
                        <p>You’ll be redirected to home shortly.</p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-red-600">Verification Failed ❌</h2>
                        <p>Invalid or expired link. Try signing up again.</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Verify;