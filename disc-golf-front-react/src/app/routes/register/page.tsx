"use client"

import { IRegisterData } from "@/domain/IRegisterData";
import AccountService from "@/services/AccountService";
import { AppContext } from "@/state/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { json } from "stream/consumers";

export default function Register() {
    const router = useRouter();
    const [values, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    } as IRegisterData);

    const handleChange = (target: EventTarget & HTMLInputElement ) => {

        setInput({ ...values, [target.name]: target.value });
        }
    
    const [validationError, setvalidationError] = useState("");

    const { userInfo, setUserInfo } = useContext(AppContext)!;

    const validateAndRegister = async () => {
        if (values.email.length < 5) {
            setvalidationError("Invalid email");
            return;
        }
        if (3 > values.firstName.length && values.firstName.length > 64) {
            setvalidationError("First name must be between 3 and 64 characters");
            return;
        }

        if (3 > values.lastName.length && values.lastName.length > 64) {
            setvalidationError("Last name must be between 3 and 64 characters");
            return;
        }

        if (3 > values.password.length && values.password.length > 64) {
            setvalidationError("Name must be between 3 and 64 characters");
            return;
        }

        if (values.password !== values.confirmPassword) {
            setvalidationError("Passwords do not match");
            return;
        }

        const response = await AccountService.register(values);
        if (response.data) {
            setUserInfo(response.data);
            router.push("/routes/search");
        }

        if (response.errors && response.errors.length > 0) {
            setvalidationError(response.errors[0]);
        }

    }

    return (
        <div className="row">
            <div className="col-md-5">
                <h2>Register</h2>
                <hr />
                <div className="form-floating mb-3">
                    <input onChange={(e) => { handleChange(e.target) }}
                        id="firstName" name="firstName" type="text" className="form-control" value={values.firstName} autoComplete="firstName" placeholder="John" />
                    <label htmlFor="firstName" className="form-label">First name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                         onChange={(e) => { handleChange(e.target) }}
                        id="lastName" name="lastName" type="lastName" className="form-control" value={values.lastName} autoComplete="lastName" placeholder="Doe" />
                    <label htmlFor="lastName" className="form-label">Last name</label>
                </div>
                <div className="text-danger" role="alert">{validationError}</div>
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => { handleChange(e.target); setvalidationError(""); }}
                        id="email" type="email" name="email" className="form-control" value={values.email} autoComplete="email" placeholder="name@example.com" />
                    <label htmlFor="email" className="form-label">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => { handleChange(e.target); setvalidationError(""); }}
                        id="password" type="password" name="password" className="form-control" value={values.password} autoComplete="password" placeholder="password" />
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => { handleChange(e.target); setvalidationError(""); }}
                        id="confirmPassword" type="password" name="confirmPassword"  className="form-control" value={values.confirmPassword} autoComplete="password" placeholder="password" />
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                </div>
                <div>
                    <button onClick={(e) => validateAndRegister()} className="w-100 btn btn-lg btn-primary">Register</button>
                </div>
            </div>
        </div>


    );
}
