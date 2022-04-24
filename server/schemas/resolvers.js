const { User, Book } = require('../models')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
        me: async () => {
            return User.find().sort({ createdAt: -1 })
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return user;
        },

        addUser: async (parent, args) => {
            const user = await User.create(args)

            return user
        },

        saveBook: async () => {

        },

        removeBook: async () => {

        }
    }
}

module.exports = resolvers;