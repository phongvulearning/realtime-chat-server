import { faker } from "@faker-js/faker";
import { Author, Badge, Message } from "./types";

export const generateMessage = (options?: {
  content?: string;
  author?: Author;
}): Message => {
  return {
    id: faker.datatype.uuid(),
    author: options?.author ?? generateUser(),
    content: options?.content ?? generateRandomSentence(),
  };
};

export const generateUser = (): Author => {
  return {
    rgbColor: faker.internet.color(250, 250, 250),
    name: faker.internet.userName(),
    badges: generateRandomBadges(),
  };
};

const generateRandomBadges = (): Badge[] => {
  const badge = (badge: Badge, prob: number) =>
    faker.helpers.maybe(() => badge, { probability: prob });

  return [
    badge("vip", 0.1),
    badge("moderator", 0.1),
    badge("prime", 0.2),
    badge("turbo", 0.1),
  ].filter((x) => x !== undefined) as Badge[];
};

const generateRandomSentence = () => {
  const sentences: string[] = [
    "Hello! 👋🏻",
    "🤣🤣🤣🤣",
    "lol",
    "So cool! 😎",
    "I love this chat! 😍",
    "Please don't write bad words!",
    "Is anybody here ?",
    "Byeeee",
    "👋🏻",
    "🤣🤣🤣🤣",
    "fuck",
    "hello world",
    "javascript",
    "typescript",
    "react",
    "follows",
    "follows back",
    "Phong Vu handsome",
    "HTML is the language of the web",
    "CSS is the language of the web",
    "JavaScript is the best language for the web and the future",
    "React is the best framework for the web and the future",
    "Please don't write bad words!",
    "Please write good words!",
    "Hello everyone! 👋🏻",
    "I'm here to help you!",
    "I'm here to help you with your questions!",
    "I'm here to help you with your problems!",
    "I'm here to help you with your issues!",
    "I'm here to help you with your doubts!",
    "I'm here to help you with your queries!",
    "I'm here to help you with your concerns!",
    "I'm here to help you with your problems!",
    "I'm here to help you with your issues!",
    "I'm here to help you with your doubts!",
    "I'm here to help you with your queries!",
    "I'm here to help you with your concerns!",
    "Not a programmer, but a coder",
    "I'm a coder, not a programmer",
    "I'm hacker, not a coder",
    "Hahaha",
    "You are kidding me",
    "You are a kid",
    "You are a child",
    "You are a little kid",
    "You are a baby",
    "You are an infant",
    "You are a toddler",
    "You are a teenager",
    "You are an adult",
    "You are an old person",
    "You are a senior citizen",
    "You are a retired person",
    "You are a person",
    "I'm a person",
    "I'm a human",
    "I'm a being",
    "I'm an animal",
    "I'm a creature",
    "I'm a being",
    "I'm a person",
    "I'm a human",
    "I'm a being",
    "I'm an animal",
    "i'm a creature",
  ];

  return faker.helpers.arrayElement(sentences);
};
