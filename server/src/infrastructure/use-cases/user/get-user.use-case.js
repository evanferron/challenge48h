const getUser = (id) => async (userRepository) => {

    const user = await userRepository.findByIdOrThrow(id);

    return user;
}