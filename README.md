# jarvis_add-milestone-to-issue

> A GitHub App built with [Probot](https://github.com/probot/probot) that jarvis - adds a milestone to an issue

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t jarvis_add-milestone-to-issue .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> jarvis_add-milestone-to-issue
```

## Contributing

If you have suggestions for how jarvis_add-milestone-to-issue could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 Zefau <zefau@mailbox.org>
