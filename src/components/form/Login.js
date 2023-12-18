import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonContext from '../../contexts/common/commonContext';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import AuthService from './ServicesConnexionInscription/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !
      </div>
    );
  }
};

const Login = () => {
  const { setLoggedIn } = useContext(commonContext);

  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
    pays: '',
    ville: '',
    codePostale: '',
    role: ['user'],
  });

  const history = useNavigate();
  const [showLoginLink, setShowLoginLink] = useState(false);

  const handleSave = () => {
    axios
      .post('http://localhost:8080/api/auth/signup', user)
      .then((res) => {
        console.log('Nouvel utilisateur ajouté avec succès');
        toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");

        // Rediriger vers la page de connexion après quelques secondes
        setTimeout(() => {
          history('/login'); // Redirection vers la page de connexion
        }, 3000);

        // Réinitialiser les valeurs du formulaire après une inscription réussie
        setUser({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          telephone: '',
          adresse: '',
          pays: '',
          ville: '',
          codePostale: '',
          role: ['user'],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
      });
  };

  const { isFormOpen, toggleForm } = useContext(commonContext);

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    toggleForm(false);
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = () => {
    AuthService.login(email, password)
      .then(() => {
        history('/'); // Redirection vers la page d'accueil
        window.location.reload();
        toast.success("Connexion réussie ! Ravie de vous revoir !", {
          autoClose: 3000,
        });

        // Redirection vers la page d'accueil après que le toast a été fermé
        setTimeout(() => {
          history('/');
        }, 6000);
        setLoggedIn(true);

      })

      .catch((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error("email ou mot de passe est incorrectes!");
      });
  };

  return (
    <>
      {isFormOpen && (
        <div className="backdrop">
          <div className="modal_centered">
            <form id="account_form" ref={formRef}>
              <div className="form_head">
                <h2>{isSignupVisible ? 'Inscription' : 'Connexion'}</h2>
                <p className="custom-text">
                  {isSignupVisible ? 'Vous avez déjà un compte ?' : 'Nouveau sur Trendy ?'}
                </p>
                &nbsp;&nbsp;
                <button type="button" onClick={handleIsSignupVisible}>
                  {isSignupVisible ? 'Connexion' : 'Créer un compte'}
                </button>
              </div>

              <div className="form_body">
                {isSignupVisible && (
                  <>
                    <div className="input_box">
                      <input
                        type="text"
                        name="nom"
                        className="input_field"
                        value={user.nom}
                        onChange={(e) => setUser({ ...user, nom: e.target.value })}
                        required
                      />
                      <label className="input_label">Nom</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="text"
                        name="prenom"
                        className="input_field"
                        value={user.prenom}
                        onChange={(e) => setUser({ ...user, prenom: e.target.value })}
                        required
                      />
                      <label className="input_label">Prenom</label>
                    </div>
                  </>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="email"
                      name="email"
                      className="input_field"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      validations={[required]}
                    />
                    <label className="input_label">Email</label>
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="text"
                      name="adresse"
                      className="input_field"
                      value={user.adresse}
                      onChange={(e) => setUser({ ...user, adresse: e.target.value })}
                      required
                    />
                    <label className="input_label">Adresse</label>
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="number"
                      name="telephone"
                      className="input_field"
                      value={user.telephone}
                      onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                      minLength="10"
                      maxLength="10"
                      required
                    />
                    <label className="input_label">Télephone</label>
                  </div>
                )}
                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="text"
                      name="pays"
                      className="input_field"
                      value={user.pays}
                      onChange={(e) => setUser({ ...user, pays: e.target.value })}
                      required
                    />
                    <label className="input_label">Pays</label>
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="text"
                      name="ville"
                      className="input_field"
                      value={user.ville}
                      onChange={(e) => setUser({ ...user, ville: e.target.value })}
                      required
                    />
                    <label className="input_label">Ville</label>
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="number"
                      name="codePostale"
                      className="input_field"
                      value={user.codePostale}
                      onChange={(e) => setUser({ ...user, codePostale: e.target.value })}
                      required
                    />
                    <label className="input_label">Code Postale</label>
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="password"
                      className="input_field"
                      name="password"
                      value={user.password}
                      required
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      validations={[required]}
                    />
                    <label className="input_label">Mot de passe</label>
                  </div>
                )}

                {!isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="email"
                      name="email"
                      className="input_field"
                      value={email}
                      onChange={onChangeemail}
                      validations={[required]}
                    />
                    <label className="input_label">Email</label>
                  </div>
                )}

                {!isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="password"
                      className="input_field"
                      name="password"
                      value={password}
                      required
                      onChange={onChangePassword}
                    />
                    <label className="input_label">Mot de passe</label>
                  </div>
                )}

                <button
                  type="button"
                  className="btn login_btn"
                  onClick={() => {
                    if (isSignupVisible) {
                      handleSave();
                    } else {
                      handleLogin();
                    }
                  }}
                >
                  {isSignupVisible ? 'Inscription' : 'Connexion'}
                </button>

                {showLoginLink && (
                  <div className="alert alert-success" role="alert">
                    Vous pouvez maintenant vous connecter.
                  </div>
                )}
              </div>

              <div
                className="close_btn"
                title="Fermer"
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>

              {/* Ajoutez le composant ToastContainer à la fin du formulaire */}
              <ToastContainer />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;