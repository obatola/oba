import { API_PATHS } from "@/modules/be-planner/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BELogin() {
    const [error, setError] = useState<string>();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, firstName, lastName } =
            event.target as unknown as {
                email: { value: string };
                password: { value: string };
                firstName: { value: string };
                lastName: { value: string };
            };

        (async () => {
            try {
                const response = await fetch(API_PATHS.signup, {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value,
                        firstName: firstName.value,
                        lastName: lastName.value,
                    }),
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log({ responseBody });
                    if (responseBody.id) {
                        router.push("/be-planner");
                    }
                }

                throw Error(responseBody);
            } catch (error) {
                console.log({ error, errormessage: error.message });
                if (error && error.message && error.message.message) {
                    setError(error.message.message as string);
                } else {
                    setError("error logging in");
                }
            }
        })();
    };

    const handleFormChange = () => {
        if (error) {
            setError("");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "400px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    margin: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>Sign Up</h2>
                <div>
                    <input type="text" name="email" placeholder="email" />
                </div>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                </div>
                <button>submit</button>
                {error && (
                    <div
                        style={{
                            backgroundColor: "red",
                            padding: "10px",
                            marginTop: "10px",
                            width: "200px",
                        }}
                    >
                        {error}
                    </div>
                )}
            </form>
            <Link href="/be-planner/login">log in</Link>
        </div>
    );
}
