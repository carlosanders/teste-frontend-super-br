node {

    def compileTimeout = 40
    def deployTimeout = 5
	def packageJson = "./package.json"
    def customImg = null;
  
	def pipelineWrapper = workbench();

    stage('Check parameters'){
        script { 
            properties([
                parameters([
                    text(name: 'DOCKER_IMAGE_NAME',
                        defaultValue: 'docker-registry.agu.gov.br/govbr/app/supp-administrativo-frontend', 
                        description: 'Nome da imagem docker (sem tag) do Super frontend',
                        trim: true)                      
                    ])
            ]);
        }
    }
    
    stage('Checkout Git') {
        checkout scm
    }

    stage('Npm dependecies Prod') {
        timeout(time: compileTimeout) {
            pipelineWrapper.npm.installAllDependencies(".", "--legacy-peer-deps");

        }
    }

    stage('Build Prod') {
        timeout(time: compileTimeout) {
            pipelineWrapper.npm.buildProd();

        }
    }
  /*
  
    stage('Npm Test') {
        timeout(time: compileTimeout) {			
            pipelineWrapper.npm.test();
        }
    }
  */


    stage('Npm push') {
        if (workbench.check.isDevelopOrStagingOrMasterBranch()){
            timeout(time: deployTimeout) {            
                pipelineWrapper.npm.push();
            }
        }else{
            workbench.pipelineUtils.skipCurrentStage();
        }        
	}

    stage('Docker build') {
        if (workbench.check.isDevelopOrStagingOrMasterBranch()){
            timeout(time: compileTimeout) {
                customImg = pipelineWrapper.docker.buildApp(params.DOCKER_IMAGE_NAME, "-f docker/prod/DockerFile .")
            }
        }else{
            workbench.pipelineUtils.skipCurrentStage();
        }        
    }

    /*stage('Test image') {
        //Roda os testes da imagem docker com o DGOSS
        if (workbench.check.isDevelopOrStagingOrMasterBranch()){
            timeout(time: compileTimeout) {
                pipelineWrapper.docker.test();
            }
        }else{
            workbench.pipelineUtils.skipCurrentStage();
        }        
    }*/

    stage('Docker push') {
        if (workbench.check.isDevelopOrStagingOrMasterBranch()){
            //Publica a imagem docker no repositório privado (configurado no jenkins-shared)
            timeout(time: deployTimeout) {
                pipelineWrapper.docker.push(customImg);
            }
        }else{
            workbench.pipelineUtils.skipCurrentStage();
        }        
    }

	/*
    stage('Sonar QA') {
        timeout(time: deployTimeout) {            
            pipelineWrapper.sonar.verify();
        }
	}
	*/	

   stage('Deploy') {
        if (workbench.check.isDevelopOrStagingOrMasterBranch()){
            timeout(time: deployTimeout) {
                pipelineWrapper.kubernetes.deploy("docker/prod/deployment.yaml", "package.json");
            }
        }else{
            workbench.pipelineUtils.skipCurrentStage();
        }        
    }    
}
