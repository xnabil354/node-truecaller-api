import axios from 'axios';
import readlineSync from 'readline-sync';
import cfonts from 'cfonts';
import chalk from 'chalk';

class TrueCaller {
    constructor(nomorCode, countryCode) {
        this.nomorCode = nomorCode;
        this.countryCode = countryCode;
    }

    async start() {

        cfonts.say('TRUECALLER|API', {
            font: 'shade',
            align: 'center',
            colors: ['yellow', 'green'],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0',
            gradient: false,
            independentGradient: false,
            transitionGradient: false,
            env: 'node'
        });
        console.log(chalk.blue('======================================'))
        console.log(chalk.yellow('Creator : xzhndvs'))
        console.log(chalk.yellow('Instagram : @xzhndvs'))
        console.log(chalk.yellow('WhatsApp : 081281524356'))
        console.log(chalk.blue('======================================'))

    }

    async fetchData() {
        let response = await axios.get('https://xzhndvs.vercel.app/api/truecaller', {
            params: {
                nomorCode: this.nomorCode,
                countryCode: this.countryCode
            }
        });

        let data = response.data.data.data[0];
        let name = data.name;
        let phone = data.phones[0];
        let provider = phone.carrier;
        let nationalFormat = phone.nationalFormat;

        return { name, provider, nationalFormat };
    }
}

(async () => {
    let startCommand = new TrueCaller();
    await startCommand.start();
    while (true) {
        try {
            let nomorCode = readlineSync.question(chalk.red('Enter nomorCode : '));
            let countryCode = readlineSync.question(chalk.red('Enter countryCode : '));
            let trueCaller = new TrueCaller(nomorCode, countryCode);
            let { name, provider, nationalFormat } = await trueCaller.fetchData();
            let result = `Name: ${name}\nProvider: ${provider}\nNational Format: ${nationalFormat}`;
            console.log(chalk.green(result));
        } catch (error) {
            console.log(error);
        }
    }
})();