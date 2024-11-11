# Crowdsourced Label Aggregation with Confirmation Bias Mitigation

This repository supports the data collection infrastructure for the research project *"Accounting for Confirmation Bias in Crowdsourced Label Aggregation"*, which investigates how confirmation bias affects crowdsourced label quality and proposes a novel algorithm to account for this bias in aggregating crowd annotations. This research explores human bias in crowd annotation and aims to enhance the reliability of human-in-the-loop systems by accurately inferring task ground truths while considering cognitive biases.

### Abstract
*Collecting large-scale human-annotated datasets via crowdsourcing is crucial for training and improving automated models in human-in-the-loop AI systems. However, biases, particularly confirmation bias, can affect data quality and, consequently, model performance. This paper presents a bias-aware label aggregation algorithm that factors in crowd workers' varying levels of confirmation bias, enhancing ground-truth inference from crowdsourced data. Real-world and synthetic data evaluations demonstrate the algorithm's advantage over baseline methods in tasks where workers exhibit confirmation bias.*

### Overview
This repository provides the web application and backend infrastructure to collect crowd-sourced annotations. The web app is built on Meteor, following a structure similar to other crowd annotation systems, and includes templates and JavaScript files to facilitate data collection across various user interactions.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mgemalma/bias_human_subject_experiment_infrastructure
    cd bias_human_subject_experiment_infrastructure
    ```

2. **Install dependencies**:
   Ensure [Node.js](https://nodejs.org/) and [Meteor](https://www.meteor.com/) are installed, then run:
   ```bash
   npm install
   ```

### Usage

#### Starting the Application
- **Run the Meteor App**:
    ```bash
    meteor
    ```
    This command starts the server locally for testing and development.

#### Observing Database Changes
To monitor real-time updates in MongoDB, open a separate terminal and run:
```bash
meteor mongo
```

#### Running the Web App
Access the app locally through a structured URL format:

```plaintext
http://localhost:3000/?workerId=<worker_id>&assignmentId=<assignment_id>&hitId=<hit_id>&turkSubmitTo=<submission_url>
```
## Deployment

To deploy the Meteor app locally, use the following example commands to set up the environment variables and start the application. **Note:** Adjust these commands according to your specific setup; the following is just an example.

```bash
# Set the port number for the application
port_num='127.0.0.1:3000'

# Set the root URL for the application
root_url='https://yourdomain.com/yourapp'

# Export the ROOT_URL and BIND_UP variables
export ROOT_URL=$root_url
export BIND_UP=$port_num

# Start the Meteor app on the specified port
meteor run --port $port_num

# Notify deployment completion
echo "Deployment finished"
```

### Directory Structure

- **client/**: Contains the client-side code, including:
  - **main.js**: Central script file configuring experiment settings, user interactions, and data verification functions.
  - **main.html**: HTML structure for the web app's base interface.
  - **main.css**: Styling for the application.
  - **mainindex/**: Holds individual view HTML files for participant interaction.
    - **accept.html**: User agreement to the experiment.
    - **age.html**: Collects participant age information.
    - **education.html**: Participant education level collection.
    - **error.html**: Displays error messages to users.
    - **first.html**: Initial template where other HTML templates are rendered.
    - **gc_stance.html**: Gathers user stance on gun control.
    - **gender.html**: Collects participant gender information.
    - **home.html**: Welcome view shown when users enter the web app.
    - **instructions.html**: Consent form.
    - **inst.html**: Provides instructions for the experiment.
    - **party_affiliation.html**: Collects participant political affiliations.
    - **refresh.html**: Error message if something goes wrong.
    - **state.html**: Gathers participant state information.
    - **taskDesign.html**: Main task interface for crowd workers, where tasks are assigned.

- **collections/task-collection.js**: MongoDB collection definitions:
  - **Tasks**: Stores tasks assigned to users.
  - **UserAdv**: Stores participant demographic and interaction data.
  - **Statements**: Stores statements presented to users.
  - **WorkerAnswers**: Stores answers provided by workers.

- **private/**: Stores server-only accessible resources, could be used to add security layers to data processing.

- **public/**: Contains public images and other assets for the app’s interface.

- **server/main.js**: Manages server-side operations, including database management and user-session handling.


### Dependencies

The following dependencies support data handling, server management, and security:
- `@babel/runtime`: Provides the runtime for Babel transformations.
- `bcrypt`: Enables secure password hashing and management.
- `express`: Lightweight framework for handling server-side operations and API requests.
- `http-proxy`: Provides HTTP proxying capabilities.
- `meteor-node-stubs`: Includes Node.js stubs for use with Meteor on the client side.

These dependencies ensure the application is equipped with essential tools for API integration, security, and server functionality.


### License

**MIT License with Attribution Requirement**

```
MIT License with Attribution Requirement

Copyright (c) 2024 mgemalma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

1. **Attribution Requirement**: Users of this software are required to give appropriate credit to the original author, Meric Altug Gemalmaz (mgemalma), in any derivative works, publications, or software distributions that utilize this software. This includes a citation to relevant research papers where applicable.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
