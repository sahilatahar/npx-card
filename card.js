#!/usr/bin/env node
"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
	{
		type: "list",
		name: "action",
		message: "What you want to do?",
		choices: [
			{
				name: `Send me an ${chalk.green.bold("email")}?`,
				value: () => {
					open("mailto:sahilatahar@gmail.com");
					console.log("\nDone, see you soon at inbox.\n");
				},
			},
			{
				name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
				value: () => {
					// cliSpinners.dots;
					const loader = ora({
						text: " Downloading Resume",
						spinner: cliSpinners.material,
					}).start();
					let pipe = request(
						"https://drive.google.com/uc?export=download&id=1nGZ7eDp-YCEMyR4vNIeKT2mdPWqefQXz"
					).pipe(fs.createWriteStream("./SAHIL_ATAHAR_RESUME.pdf"));
					pipe.on("finish", function () {
						let downloadPath = path.join(
							process.cwd(),
							"SAHIL_ATAHAR_RESUME.pdf"
						);
						console.log(`\nResume Downloaded at ${downloadPath} \n`);
						open(downloadPath);
						loader.stop();
					});
				},
			},
			{
				name: `See ${chalk.yellow.bold("Featured Projects")}?`,
				value: () => {
					console.log(`
${chalk.green.bold("🔹 CodeSync:")} ${chalk.cyan(
						"Real‑time collaborative code editor"
					)}
   ${chalk.blue("URL:")}   ${chalk.underline(
						"https://github.com/sahilatahar/Code-Sync"
					)}
   ${chalk.blue("Live:")}  ${chalk.underline(
						"https://code-sync-live.vercel.app/"
					)}
   ${chalk.magenta("Description:")}
     ${chalk.white(
				"A real-time collaborative code editor featuring unique room"
			)}
     ${chalk.white("generation, syntax highlighting, and auto-suggestions.")}
     ${chalk.white("Users can seamlessly edit, save, and download files while")}
     ${chalk.white("communicating through group chat.")}
`);
					console.log(`
${chalk.green.bold("🔹 Real Notes:")} ${chalk.cyan(
						"Feature-rich note-taking application"
					)}
   ${chalk.blue("URL:")}   ${chalk.underline(
						"https://github.com/sahilatahar/Real-Notes"
					)}
   ${chalk.blue("Live:")}  ${chalk.underline("https://realnotes.netlify.app/")}
   ${chalk.magenta("Description:")}
     ${chalk.white(
				"A note-taking application with CRUD operations, authentication,"
			)}
     ${chalk.white(
				"profile management, multi-language support, and customizable themes."
			)}
     ${chalk.white(
				"Features include creating, reading, updating, deleting notes, starring"
			)}
     ${chalk.white(
				"important notes for quick access, labeling notes by priority, and"
			)}
     ${chalk.white(
				"recovering deleted notes. Users can manage their profiles, change"
			)}
     ${chalk.white(
				"account settings, and toggle between light and dark themes."
			)}
     ${chalk.white("The application is fully responsive across all devices.")}
`);
				},
			},
			{
				name: "Just quit.",
				value: () => {
					console.log("\nHave a nice day.\n");
				},
			},
		],
	},
];

const data = {
	name: chalk.bold.green("             Sahil Atahar"),
	handle: chalk.white("@sahilatahar"),
	work: `${chalk.white("Full Stack Developer")} ${chalk
		.hex("#2b82b2")
		.bold("AR Robotics")}`,
	twitter: chalk.gray("https://twitter.com/") + chalk.cyan("sahilatahar"),
	github: chalk.gray("https://github.com/") + chalk.green("sahilatahar"),
	linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("sahilatahar"),
	web: chalk.cyan("https://sahilatahar.dev"),
	npx: chalk.red("npx") + " " + chalk.white("sahilatahar"),

	labelWork: chalk.white.bold("       Work:"),
	labelTwitter: chalk.white.bold("    Twitter:"),
	labelGitHub: chalk.white.bold("     GitHub:"),
	labelLinkedIn: chalk.white.bold("   LinkedIn:"),
	labelWeb: chalk.white.bold("        Web:"),
	labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
	[
		`${data.name}`,
		``,
		`${data.labelWork}  ${data.work}`,
		``,
		`${data.labelTwitter}  ${data.twitter}`,
		`${data.labelGitHub}  ${data.github}`,
		`${data.labelLinkedIn}  ${data.linkedin}`,
		`${data.labelWeb}  ${data.web}`,
		``,
		`${data.labelCard}  ${data.npx}`,
		``,
		`${chalk.italic(
			"🚀 Currently exploring cloud technologies (AWS) and DevOps."
		)}`,
		`${chalk.italic("💼 Building and maintaining HRM & CRM applications.")}`,
		`${chalk.italic(
			"📫 My inbox is always open—feel free to ask me anything or just say hi!"
		)}`,
		`${chalk.italic(
			"📚 Ask me about the MERN Stack, Next.js, or my real-time code editor, CodeSync."
		)}`,
	].join("\n"),
	{
		margin: 1,
		float: "center",
		padding: 1,
		borderStyle: "single",
		borderColor: "green",
	}
);

console.log(me);
const tip = [
	`Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
	"",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());
