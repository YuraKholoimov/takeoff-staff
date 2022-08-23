import {instanceContacts} from '../settings/settings';
import {Url} from "../settings/env";
import {ContactType} from "../../bll/contactSlice";

export const contacts = {
    getContacts() {
        return instanceContacts.get(Url.GET_CONTACTS)
    },
    addNewContact(data: ContactType) {
        return instanceContacts.post(Url.ADD_CONTACTS, data)
    },
    deleteContact(id: string) {
        return instanceContacts.delete(`/contacts/${id}`)
    },
    updateContact(id: string, first_name: string, last_name: string, email: string) {
        return instanceContacts.put(`/contacts/${id}`, {first_name, last_name, email})
    }
    ,searchContactByName(searchValue: string) {
        return instanceContacts.get(`/contacts`, {params: {first_name: searchValue}})
    },
    searchContactByLastName(searchValue: string) {
        return instanceContacts.get(`/contacts`, {params: {last_name: searchValue}})
    },

}