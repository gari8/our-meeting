import React from "react";
import router from "next/router";
import { auth } from "./firebase";
import Loading from "../components/templates/Loading";


const withAuth = Component => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                status: "LOADING"
            };
        }
        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    this.setState({
                        status: "SIGNED_IN"
                    });
                } else {
                    router.push("/");
                }
            });
        }
        renderContent() {
            // @ts-ignore
            const { status } = this.state;
            if (status == "LOADING") {
                return <Loading />
            } else if (status == "SIGNED_IN") {
                return <Component {...this.props} />;
            }
        }
        render() {
            return <>{this.renderContent()}</>;
        }
    };
};
export default withAuth;