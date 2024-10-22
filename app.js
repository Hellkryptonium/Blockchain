// Check if MetaMask is installed
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const walletAddressDiv = document.getElementById('walletAddress');
    const ethBalanceDiv = document.getElementById('ethBalance');

    // Function to connect MetaMask wallet and fetch ETH balance
    async function connectWallet() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request accounts from MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0]; // Get the first account
                walletAddressDiv.innerHTML = `Connected wallet: ${walletAddress}`;

                // Create a provider using ethers.js
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                // Fetch the ETH balance
                const balance = await provider.getBalance(walletAddress);
                // Convert the balance from wei to ether
                const balanceInEth = ethers.utils.formatEther(balance);
                ethBalanceDiv.innerHTML = `ETH Balance: ${balanceInEth} ETH`;

            } catch (error) {
                console.error('Error connecting to MetaMask', error);
                walletAddressDiv.innerHTML = 'Error connecting to MetaMask. Please try again.';
                ethBalanceDiv.innerHTML = '';
            }
        } else {
            walletAddressDiv.innerHTML = 'MetaMask is not installed. Please install MetaMask and try again.';
            ethBalanceDiv.innerHTML = '';
        }
    }

    // Add click event listener to the connect button
    connectButton.addEventListener('click', connectWallet);
});
