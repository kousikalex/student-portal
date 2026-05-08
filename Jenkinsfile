pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building student portal...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying student portal...'
            }
        }
    }
    post{
    failure{
        mail to:'santhiyasabapathy@gmail.com',
            subject:"Build failed",
            body:"Check jenkins"
            }
    success{
        mail to:'santhiyasabapathy@gmail.com',
            subject:"Build Success",
            body:"All Good. Build sucess in jenkins"
            }
}

}
