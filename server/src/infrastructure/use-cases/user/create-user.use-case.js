const createUser = (email, password, name) => async ({ userPostgresRepository }) => {

    if (!email) {
        throw new Error("Email missing");
    }
    if (!password) {
        throw new Error("Password missing");
    }
    if (!name) {
        throw new Error("Name missing");
    }
    // verify email
    console.log(email, password, name)
    await userPostgresRepository.create(email, passwordHashed, name);
}

export default createUser;