pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'pm2 stop all'
                sh 'pm2 start dist/index.js'
            }
        }
    }
}