                // Web3 connect button
				class web3Button extends React.Component {
				    // Initializes our state, so that the component can be cleared after serving its purpose
					state={show:true};
					
					// Defines the asynchronous Web3 connect function
					async connect(e) {
						e.target.enabled = false;
						
						// Standard Web3 functionality - prompt for connection and receive a list of accounts
						const accounts = await ethereum.request({
							method: 'eth_requestAccounts'
						});
						
						// Picks the first connected account in the returned array of accounts
						const account = accounts[0];
						
						// Sets the account into the value of the flow component - Web3Account in the sample
						manywho.state.setComponent(this.props.id, { contentValue: account }, this.props.flowKey, true);
						
						// Sync's the flow engine and UI with the updated data
						await manywho.engine.sync(this.props.flowKey);
						
				        // Combines with the first if-statement in the render function to clear the component after connecting
						this.setState({show:false});
					}
					
					render() {
					    // Clears component after successfully connecting
						if (!this.state.show) {
							return null;
						}
						// If a Web3 client is detected it will present the connect button. Otherwise it will show text recommending they install Web3
						if (typeof window.ethereum !== 'undefined') {
							return (
								React.createElement(
									"button", {
										id: "web3Button",
										className: "btn btn-primary web3-btn",
										// When the button is clicked it will trigger the asynchronous connect() function above
										onClick: this.connect.bind(this)
									},
									"Connect Web3")
							);
						} else {
							return (
								React.createElement("p", {},
									"No Web3 client detected, install Metamask extension or similar."
									)
							);
						}
					}
				}
				// Registers the component for use in the Boomi Flow UI
				manywho.component.register('web3-btn', web3Button);
				// End web3 connect button
