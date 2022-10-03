const fs = require("fs/promises");

const path = require("path");

const {nanoid} = require("nanoid");


const contactsPath = path.join(__dirname, "db/contacts.json");

async function updateListContacts(contacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result)
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId.toString());
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId.toString());
    if(index === -1){
      return null;
    }
  const [result] = contacts.splice(index, 1);
  await updateListContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await updateListContacts(contacts);
  return newContact;
}

module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact
}