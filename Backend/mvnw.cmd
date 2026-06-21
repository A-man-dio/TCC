@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET "MVN_CMD=mvn.cmd") ELSE (SET "MVN_CMD=%__MVNW_ARG0_NAME__%")
@SET MAVEN_PROJECTBASEDIR=%~dp0
@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip
@SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar"

@IF EXIST %WRAPPER_JAR% GOTO mvn_exec

@echo Downloading Maven Wrapper...
@java -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" ^
  -Dmaven.wrapper.url="%DOWNLOAD_URL%" ^
  -jar "%WRAPPER_JAR%" %*
@GOTO :EOF

:mvn_exec
@java -classpath %WRAPPER_JAR% org.apache.maven.wrapper.MavenWrapperMain %*
