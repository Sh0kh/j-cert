import { useState } from "react";
import logo from "../img/big-logo.jpg";

export default function Login() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form ma'lumotlari:", formData);
    };

    return (
        <div>
            <div className="page-title light-background">
                <div className="container">
                    <h1>Ro'yxatdan o'tish</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <img style={{ width: "70px" }} src={logo} alt="Logo" />
                            </li>
                            <li className="current">J-CERT UZBEKISTAN</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Akkaunt yarating</h5>
                                            <p className="text-center small">
                                                Akkaunt yaratish uchun ma'lumotlaringizni kiriting
                                            </p>
                                        </div>

                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                                            <div className="col-12">
                                                <label htmlFor="yourName" className="form-label">
                                                    Ismingiz
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="yourName"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Iltimos, ismingizni kiriting!</div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourEmail" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    id="yourEmail"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Iltimos, to'g'ri email kiriting!</div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">
                                                    Username
                                                </label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text">@</span>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        id="yourUsername"
                                                        required
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">Username tanlang.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">
                                                    Parol
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="yourPassword"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Parolingizni kiriting!</div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        name="termsAccepted"
                                                        type="checkbox"
                                                        id="acceptTerms"
                                                        checked={formData.termsAccepted}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="acceptTerms">
                                                        Meshartlarga roziman va <a href="#">qabul qilaman</a>
                                                    </label>
                                                    <div className="invalid-feedback">
                                                        Topshirishdan oldin rozi bo'lishingiz kerak.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    style={{ backgroundColor: "#00cc95", border: "none" }}
                                                    className="btn btn-primary w-100"
                                                    type="submit"
                                                    id="sign-btn"
                                                >
                                                    Akkaunt yaratish
                                                </button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">
                                                    Akkauntingiz bormi? <a href="./login.html">Kirish</a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
