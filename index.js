const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

(async function githubLogin() {
  let driver = await new Builder().forBrowser("safari").build();
  await driver.manage().window().maximize();

  const screenshotsDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  try {
    //Probamos que la pagina de inicio de sesion carga correctamente
    await driver.get("https://github.com/login");
    await saveScreenshot(driver, "login_cargado");

    await driver.wait(until.elementLocated(By.id("login_field")), 5000);
    await driver.wait(until.elementLocated(By.id("password")), 5000);

    // ================================================
    // Validando que las credenciales sean incorrectas
    await driver.findElement(By.id("login_field")).sendKeys("email@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("la_contrasenia");
    await driver.findElement(By.name("commit")).click();
    await driver.wait(until.urlContains("github.com"), 5000);
    await saveScreenshot(driver, "prueba_validacion_credenciales_login");

    // =================================================
    // Validando que github.com carga correctamente

    await driver.get("https://github.com");
    await driver.sleep(5000)
    await saveScreenshot(driver, "pagina_principal");


    // =================================================
    // Se navega a la infromacion de precios en github
    
    const pricingLink = await driver.wait(
      until.elementLocated(By.linkText("Pricing")),
      5000
    );
    await pricingLink.click();
    await driver.wait(until.titleContains("Pricing"), 2000);
    await driver.sleep(5000)
    await saveScreenshot(driver, "pagina_precios");
    console.log("Página de Pricing cargada con éxito.");

    // =================================================
    // Se clickea a la informacion de precios 
    
    const unirmegRATIS = await driver.wait(
      until.elementLocated(By.linkText("Join for free")),
      5000
    );
    await unirmegRATIS.click();
    await driver.sleep(5000)
    await saveScreenshot(driver, "pagina_unirme_gratis");
    console.log("Página de pagina_unirme_gratis cargada con éxito.");


    // =================================================
    // Digitamos un correo que ya existe 
    await driver.findElement(By.id("email")).sendKeys("johnkerlin52@gmail.com");
    await driver.sleep(2000)
    await saveScreenshot(driver, "correo_existente_unirme");


  } catch (error) {
    console.error("Error durante el login:", error);

    await saveScreenshot(driver, "error_occurred");
  } finally {
    await driver.quit();
  }

  async function saveScreenshot(driver, filename) {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(screenshotsDir, `${filename}.png`);
    fs.writeFileSync(filePath, screenshot, "base64");
    console.log(`Captura guardada en: ${filePath}`);
  }
 
})();
