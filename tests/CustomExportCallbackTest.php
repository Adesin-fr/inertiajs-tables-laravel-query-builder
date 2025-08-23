<?php

namespace Tests\Feature;

use Tests\TestCase;
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use App\Models\User;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class CustomExportCallbackTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_use_custom_export_callback()
    {
        // Create some test users
        User::factory()->count(3)->create();

        $queryBuilder = QueryBuilder::for(User::query())
            ->allowedSorts(['name']);

        $customExportCalled = false;
        $receivedQueryBuilder = null;

        $table = InertiaTable::make()
            ->withQueryBuilder($queryBuilder)
            ->column('name', 'Name')
            ->withExportCallback(function ($queryBuilder) use (&$customExportCalled, &$receivedQueryBuilder) {
                $customExportCalled = true;
                $receivedQueryBuilder = $queryBuilder;

                // Return a simple response for testing
                return response('Custom export data')
                    ->header('Content-Type', 'text/plain')
                    ->header('Content-Disposition', 'attachment; filename="test-export.txt"');
            });

        // Simulate export request
        request()->merge(['do_export' => '1']);

        $response = $table->handleCsvExport();

        $this->assertTrue($customExportCalled, 'Custom export callback should have been called');
        $this->assertInstanceOf(QueryBuilder::class, $receivedQueryBuilder, 'Callback should receive QueryBuilder instance');
        $this->assertEquals('Custom export data', $response->getContent());
        $this->assertEquals('text/plain', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('test-export.txt', $response->headers->get('Content-Disposition'));
    }

    /** @test */
    public function it_falls_back_to_default_export_when_no_callback_defined()
    {
        // Create some test users
        User::factory()->count(2)->create([
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);

        $queryBuilder = QueryBuilder::for(User::query());

        $table = InertiaTable::make()
            ->withQueryBuilder($queryBuilder)
            ->column('name', 'Name')
            ->column('email', 'Email');
        // No custom export callback defined

        // Simulate export request
        request()->merge(['do_export' => '1']);

        $response = $table->handleCsvExport();

        // Should use default CSV export
        $this->assertStringContainsString('text/csv', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $response->headers->get('Content-Disposition'));

        $content = $response->getContent();
        // Should contain CSV headers and UTF-8 BOM
        $this->assertStringStartsWith("\xEF\xBB\xBF", $content);
        $this->assertStringContainsString('"Name"', $content);
        $this->assertStringContainsString('"Email"', $content);
    }

    /** @test */
    public function custom_export_callback_receives_filtered_query_builder()
    {
        // Create users with different names
        User::factory()->create(['name' => 'Alice']);
        User::factory()->create(['name' => 'Bob']);
        User::factory()->create(['name' => 'Charlie']);

        $queryBuilder = QueryBuilder::for(User::query())
            ->allowedFilters(['name']);

        $receivedData = null;

        $table = InertiaTable::make()
            ->withQueryBuilder($queryBuilder)
            ->column('name', 'Name')
            ->withExportCallback(function ($queryBuilder) use (&$receivedData) {
                $receivedData = $queryBuilder->get();

                return response('OK');
            });

        // Simulate filtered export request
        request()->merge([
            'do_export' => '1',
            'filter' => ['name' => 'Alice']
        ]);

        $table->handleCsvExport();

        $this->assertNotNull($receivedData);
        $this->assertCount(1, $receivedData, 'Should only receive filtered data');
        $this->assertEquals('Alice', $receivedData->first()->name);
    }
}
