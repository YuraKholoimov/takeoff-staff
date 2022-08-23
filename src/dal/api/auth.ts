import {instanceAuth} from '../settings/settings';
import {FormFieldType} from "../../components/forms/authForm/AuthForm";
import {Url} from "../settings/env";

export const auth = {
    login(data: FormFieldType) {
        return instanceAuth.post(Url.LOGIN, data)
    },
    registration(data: FormFieldType) {
        return instanceAuth.post(Url.REGISTER, data)
    }

}