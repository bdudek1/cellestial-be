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
                sh 'tsc'
            }
        }

        stage('Prepare Environment') {
            steps {
                script {
                    // Check if any PM2 processes are running
                    def hasPM2Processes = sh(script: 'sudo pm2 list | grep -q "name" && echo $?', returnStdout: true).trim()
                    // If PM2 processes are found, delete all
                    if (hasPM2Processes == '0') {
                        sh 'sudo pm2 delete all'
                    }
                }
            }
        }

        stage('Start Application') {
            steps {
                sh 'sudo pm2 start dist/index.js'
            }
        }
    }
}