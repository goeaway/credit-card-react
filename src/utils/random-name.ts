export const getRandomName = () => {
    const names = [
        "Mr Homer Simpson",
        "Mrs Euphegenia Doubtfire",
        "Dr Octopus",
        "Mr Loki Odinson",
        "Miss Hermione Granger",
        "Miss Ellen Ripley",
        "Miss Leia Organa",
        "Mr Anakin Skywalker",
        "Mr James Bond",
        "Mrs Leslie Knope",
        "Miss Peggy Olson",
        "Mr Joey Tribbiani",
        "Mrs Catelyn Stark",
        "Mr Mad Max",
        "Mr Frodo Baggins",
        "PC Frank Butterman",
        "Mr P I Staker"
    ];

    return names[Math.floor(Math.random() * names.length)];
}