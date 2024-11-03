# Crypto Quiz - PrivacyFeedback Integration Example

## Overview
This example site showcases how to integrate PrivacyFeedback into a crypto quiz platform. After users complete the quiz, their interaction is recorded on-chain, and a verification email is sent to them to confirm their participation.

## Features
- **Interactive Quiz**: Users answer a series of questions related to cryptocurrencies.
- **On-Chain Interaction Recording**: Each user's quiz completion is recorded securely on the Oasis Network.
- **Email Verification**: After completing the quiz, users receive a verification email to confirm their interaction.

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PrivacyFeedback/Crypto-Quiz.git
   cd Crypto-Quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the PrivacyFeedback SDK:
   - Create a `.env` file in the root directory similar to `.env.example`.
   

### Running the Application
To run the crypto quiz site, execute:
```bash
npm run dev
```

## Usage
1. Navigate to the quiz page.
2. Complete the quiz.
3. Check your email for the interaction verification link.

## Documentation
For integration details, please refer to the [PrivacyFeedback SDK Documentation](https://privacy-feedback.vercel.app/).

## License
This example project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
