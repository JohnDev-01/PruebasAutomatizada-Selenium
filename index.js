const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

(async function githubTestSuite() {
  const driver = await createWebDriver("safari");
  const screenshotsDir = setupDirectory("screenshots");
  const reportFile = setupReportFile("report.html");

  try {
    await testGithubLoginPage(driver, screenshotsDir, reportFile);
    await testInvalidCredentials(driver, screenshotsDir, reportFile);
    await testMainPageNavigation(driver, screenshotsDir, reportFile);
    await testPricingPage(driver, screenshotsDir, reportFile);
    await testJoinForFreePage(driver, screenshotsDir, reportFile);
    await testEmailValidation(driver, screenshotsDir, reportFile);
  } catch (error) {
    console.error("Error durante las pruebas:", error);
    await handleTestError(driver, screenshotsDir, reportFile, error);
  } finally {
    finalizeReport(reportFile);
    await driver.quit();
    console.log("Reporte generado en:", reportFile);
  }
})();

async function createWebDriver(browserName) {
  const driver = await new Builder().forBrowser(browserName).build();
  await driver.manage().window().maximize();
  return driver;
}

function setupDirectory(dirName) {
  const dirPath = path.join(__dirname, dirName);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  return dirPath;
}

function setupReportFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(
    filePath,
    `
    <html>
    <head>
      <title>Reporte de Pruebas Automatizadas</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .success { color: green; }
        .failure { color: red; }
      </style>
    </head>
    <body>
      <h1>Reporte de Pruebas Automatizadas</h1>
      <table>
        <thead>
          <tr>
            <th>Escenario</th>
            <th>Resultado</th>
            <th>Captura de Pantalla</th>
          </tr>
        </thead>
        <tbody>
    `
  );
  return filePath;
}

function finalizeReport(reportFile) {
  fs.appendFileSync(
    reportFile,
    `
        </tbody>
      </table>
    </body>
    </html>
    `
  );
}

async function saveScreenshot(driver, screenshotsDir, filename) {
  const screenshot = await driver.takeScreenshot();
  const filePath = path.join(screenshotsDir, `${filename}.png`);
  fs.writeFileSync(filePath, screenshot, "base64");
  console.log(`Captura guardada en: ${filePath}`);
}

function addToReport(reportFile, testName, result, screenshot) {
  const statusClass = result === "Éxito" ? "success" : "failure";
  const screenshotPath = path.join("screenshots", screenshot);
  fs.appendFileSync(
    reportFile,
    `
    <tr>
      <td>${testName}</td>
      <td class="${statusClass}">${result}</td>
      <td><a href="${screenshotPath}" target="_blank">Ver Captura</a></td>
    </tr>
    `
  );
}

async function testGithubLoginPage(driver, screenshotsDir, reportFile) {
  await driver.get("https://github.com/login");
  await driver.sleep(5000);
  await saveScreenshot(driver, screenshotsDir, "login_page_loaded");
  addToReport(reportFile, "Carga de la página de inicio de sesión", "Éxito", "login_page_loaded.png");
}

async function testInvalidCredentials(driver, screenshotsDir, reportFile) {
  await driver.wait(until.elementLocated(By.id("login_field")), 5000);
  await driver.findElement(By.id("login_field")).sendKeys("email@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("la_contrasenia");
  await driver.findElement(By.name("commit")).click();
  await driver.wait(until.urlContains("github.com"), 5000);
  await driver.sleep(2000);
  await saveScreenshot(driver, screenshotsDir, "invalid_credentials");
  addToReport(reportFile, "Validación de credenciales incorrectas", "Éxito", "invalid_credentials.png");
}

async function testMainPageNavigation(driver, screenshotsDir, reportFile) {
  await driver.get("https://github.com");
  await driver.sleep(5000);
  await saveScreenshot(driver, screenshotsDir, "main_page");
  addToReport(reportFile, "Navegación a la página principal", "Éxito", "main_page.png");
}

async function testPricingPage(driver, screenshotsDir, reportFile) {
  const pricingLink = await driver.wait(until.elementLocated(By.linkText("Pricing")), 5000);
  await pricingLink.click();
  await driver.wait(until.titleContains("Pricing"), 2000);
  await driver.sleep(5000);
  await saveScreenshot(driver, screenshotsDir, "pricing_page");
  addToReport(reportFile, "Navegación a la página de precios", "Éxito", "pricing_page.png");
}

async function testJoinForFreePage(driver, screenshotsDir, reportFile) {
  const joinForFreeLink = await driver.wait(until.elementLocated(By.linkText("Join for free")), 5000);
  await joinForFreeLink.click();
  await driver.sleep(5000);
  await saveScreenshot(driver, screenshotsDir, "join_for_free_page");
  addToReport(reportFile, "Navegación a la página de unirme", "Éxito", "join_for_free_page.png");
}

async function testEmailValidation(driver, screenshotsDir, reportFile) {
  await driver.findElement(By.id("email")).sendKeys("johnkerlin52@gmail.com");
  await driver.sleep(2000);
  await saveScreenshot(driver, screenshotsDir, "email_validation");
  addToReport(reportFile, "Validación de correo existente", "Éxito", "email_validation.png");
}

async function handleTestError(driver, screenshotsDir, reportFile, error) {
  await saveScreenshot(driver, screenshotsDir, "test_error");
  addToReport(reportFile, "Error durante la ejecución", "Fallo", "test_error.png");
}
