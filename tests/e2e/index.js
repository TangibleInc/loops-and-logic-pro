import { test, expect } from '@wordpress/e2e-test-utils-playwright'

const { describe } = test

/**
 * Tests to exercise the frontend and admin features.
 *
 * Note: To interact with pages, locate elements by user-visible locators like
 * accessible role, instead of CSS selectors which can change.
 *
 * @see https://playwright.dev/docs/locators#locating-elements
 * @see https://playwright.dev/docs/locators#locate-by-role
 * @see https://www.w3.org/TR/html-aria/#docconformance
 */

describe('Admin', () => {
  test('Dashboard', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    const heading = page.getByRole('heading', {
      name: 'Welcome to WordPress',
      level: 2,
    })
    await expect(heading).toBeVisible()
  })

  const plugins = [
    ['Tangible Loops & Logic', 'tangible-loops-and-logic/tangible-loops-and-logic'],
    ['Tangible Loops & Logic Pro', 'tangible-loops-and-logic-pro/tangible-loops-and-logic-pro'],
    ['Tangible E2E', 'tangible-e2e-plugin/index'],
    ['Elementor', 'elementor/elementor'],
    ['Beaver Builder', 'beaver-builder-lite-version/fl-builder'],
  ]

  for (const [pluginTitle, pluginBasename] of plugins) {
    test(`${pluginTitle} installed`, async ({ admin, page, requestUtils }) => {
      await admin.visitAdminPage('/')

      // const plugins = await requestUtils.rest({
      //   path: 'wp/v2/plugins',
      // })
      // expect(plugins).toContain(pluginBasename)
      // console.log('plugins', plugins)

      const result = await requestUtils.rest({
        path: `wp/v2/plugins/${pluginBasename}`,
      })
      // console.log('plugin', result)

      expect(result.plugin).toBe(pluginBasename)
    })

    test(`Activate ${pluginTitle}`, async ({ admin, page, request, requestUtils }) => {
      await admin.visitAdminPage('plugins.php')

      // See if plugin is active or not
      const pluginClasses = await page.evaluate(({ pluginBasename }) => {
        const $row = document.querySelector(
          `[data-plugin="${pluginBasename}.php"]`
        )
        return [...$row.classList]
      }, { pluginBasename })

      if (!pluginClasses.includes('active')) {
        await expect(pluginClasses).toContain('inactive')

        // Find the Activate link

        const activateLink = await page.evaluate(({ pluginBasename }) => {
          const $row = document.querySelector(
            `[data-plugin="${pluginBasename}.php"]`
          )
          const $activate = $row.querySelector('a.edit')
          return $activate?.href
        }, { pluginBasename })

        await expect(activateLink).toBeTruthy()

        // Make a POST request
        await request.post(activateLink)
      }

      const plugin = await requestUtils.rest({
        path: `wp/v2/plugins/${pluginBasename}`,
      })

      expect(plugin.status).toBe('active')
    })
  }
})


describe('Admin menu', () => {
  test('Exists', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(page.getByRole('navigation', { name: 'Main menu' })).toHaveCount(1)
  })

  test('Tangbile', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('navigation', { name: 'Main menu' })
        .getByRole('link', { name: 'Tangible' })
        .first(),
    ).toHaveCount(1)
  })

  test('Tangbile -> Templates', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Templates' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Layouts', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Layouts' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Styles', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Styles' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Scripts', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Scripts' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Categories', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Categories' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Import & Export', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Import & Export' }),
    ).toHaveCount(1)
  })

  test('Tangbile -> Settings', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(
      page
        .getByRole('link', { name: 'Tangible' })
        .locator('xpath=..')
        .getByRole('link')
        .filter({ hasText: 'Settings' }),
    ).toHaveCount(1)
  })
})

describe('Template post type', () => {
  test('Archive', async ({ admin, page }) => {
    await admin.visitAdminPage('/edit.php?post_type=tangible_template')
    const heading = await page.getByRole('heading', {
      name: 'Tangible Templates',
    })
    await expect(heading).toBeVisible()
  })
  test('Add new', async ({ admin, page }) => {
    await admin.visitAdminPage('/post-new.php?post_type=tangible_template')
    const heading = await page.getByRole('heading', {
      name: ' Add New Template ',
    })
    await expect(heading).toBeVisible()
  })

})

test('Code editor', async ({ admin, page }) => {

  await admin.visitAdminPage('/post-new.php?post_type=tangible_template')

  expect(await page.evaluate(
    () => Boolean(window.Tangible)
  )).toBe(true)
  expect(await page.evaluate(
    () => Boolean(window.Tangible && window.Tangible.TemplateSystem)
  )).toBe(true)
  expect(await page.evaluate(
    () => Boolean(window.Tangible && window.Tangible.TemplateSystem && window.Tangible.TemplateSystem.CodeEditor)
  )).toBe(true)

})
